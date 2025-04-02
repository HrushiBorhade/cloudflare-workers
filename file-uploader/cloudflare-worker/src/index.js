import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

let s3Client = null;

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return handleCORS(request, env);
    }

    if (!s3Client && env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY && env.AWS_REGION) {
      s3Client = new S3Client({
        region: env.AWS_REGION,
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
      });
    }

    const url = new URL(request.url);
    if (url.pathname === "/get-upload-url" && request.method === "POST") {
      return handleUploadUrl(request, env);
    } else if (url.pathname === "/confirm-upload" && request.method === "POST") {
      return handleConfirmUpload(request, env);
    }

    return new Response("Not found", { status: 404 });
  }
};

async function handleUploadUrl(request, env) {
  try {
    if (!s3Client) {
      throw new Error("S3 client could not be initialized. Check AWS credentials.");
    }

    const body = await request.json();
    const { filename, filetype } = body;
    
    if (!filename || !filetype) {
      return corsResponse(JSON.stringify({
        error: "Missing required parameters: filename and filetype"
      }), env, 400);
    }
    
    const sanitizedFilename = filename.replace(/[^\w\s.-]/g, '_');
    const key = `uploads/${Date.now()}-${crypto.randomUUID()}-${sanitizedFilename}`;
    
    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: key,
      ContentType: filetype,
    });
    
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    
    return corsResponse(JSON.stringify({
      url: presignedUrl,
      key,
      bucket: env.AWS_S3_BUCKET
    }), env);
  } catch (error) {
    console.error(`Error generating presigned URL: ${error}`);
    return corsResponse(JSON.stringify({
      error: "Failed to generate upload URL",
      details: error.message
    }), env, 500);
  }
}

async function handleConfirmUpload(request, env) {
  try {
    const { key } = await request.json();
    
    if (!key) {
      return corsResponse(JSON.stringify({
        error: "Missing required parameter: key"
      }), env, 400);
    }
    
    if (!/^uploads\/\d+-[\w-]+-.*$/.test(key)) {
      return corsResponse(JSON.stringify({
        error: "Invalid key format"
      }), env, 400);
    }
    
    return corsResponse(JSON.stringify({
      success: true,
      message: "Upload confirmed!",
      imageUrl: `https://${env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`
    }), env);
  } catch (error) {
    console.error(`Error confirming upload: ${error}`);
    return corsResponse(JSON.stringify({
      error: "Failed to confirm upload",
      details: error.message
    }), env, 500);
  }
}

function handleCORS(request, env) {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
      "Cache-Control": "public, max-age=86400"
    }
  });
}

function corsResponse(body, env, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Cache-Control": status === 200 ? "private, no-cache" : "no-store"
    }
  });
}