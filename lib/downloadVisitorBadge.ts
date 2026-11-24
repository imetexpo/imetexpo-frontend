import type { VisitorPass } from '@/lib/api/passes';

function cleanText(value: string | null | undefined) {
  return String(value || '').replace(/\s+/gu, ' ').trim();
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Could not load badge artwork'));
    image.src = src;
  });
}

function wrapLines(ctx: CanvasRenderingContext2D, value: string, maxWidth: number) {
  const lines: string[] = [];
  let line = '';
  for (const word of value.split(' ')) {
    const candidate = line ? line + ' ' + word : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    line = '';
    for (const character of Array.from(word)) {
      if (line && ctx.measureText(line + character).width > maxWidth) {
        lines.push(line);
        line = '';
      }
      line += character;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawTextBlock(
  ctx: CanvasRenderingContext2D,
  value: string,
  options: {
    top: number;
    height: number;
    width: number;
    size: number;
    minSize: number;
    maxLines: number;
    weight: number;
  }
) {
  const text = cleanText(value).toUpperCase();
  if (!text) return;
  let fontSize = options.size;
  let lines: string[] = [];
  for (; fontSize >= options.minSize; fontSize -= 1) {
    ctx.font = options.weight + ' ' + fontSize + 'px Arial, sans-serif';
    lines = wrapLines(ctx, text, options.width);
    if (lines.length <= options.maxLines && lines.length * fontSize * 1.2 <= options.height) break;
  }
  fontSize = Math.max(fontSize, options.minSize);
  ctx.font = options.weight + ' ' + fontSize + 'px Arial, sans-serif';
  lines = wrapLines(ctx, text, options.width);
  if (lines.length > options.maxLines) {
    lines = lines.slice(0, options.maxLines);
    let last = lines[options.maxLines - 1];
    while (last && ctx.measureText(last + String.fromCharCode(8230)).width > options.width) {
      last = Array.from(last).slice(0, -1).join('');
    }
    lines[options.maxLines - 1] = last + String.fromCharCode(8230);
  }
  const lineHeight = fontSize * 1.2;
  const firstY = options.top + options.height / 2 - (lines.length - 1) * lineHeight / 2;
  ctx.save();
  ctx.beginPath();
  ctx.rect((900 - options.width) / 2, options.top, options.width, options.height);
  ctx.clip();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000000';
  lines.forEach((line, index) => ctx.fillText(line, 450, firstY + index * lineHeight));
  ctx.restore();
}

export async function renderVisitorBadgeCanvas(pass: VisitorPass): Promise<HTMLCanvasElement> {
  const width = 900;
  const height = 1428;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  const logo = await loadImage('/indiamet-logo.png');
  const logoWidth = 440;
  const logoHeight = logoWidth * logo.naturalHeight / logo.naturalWidth;
  ctx.drawImage(logo, (width - logoWidth) / 2, 76, logoWidth, logoHeight);

  ctx.fillStyle = '#00A651';
  ctx.fillRect(32, 358, width - 64, 6);

  drawTextBlock(ctx, pass.name, {
    top: 428, height: 100, width: 816, size: 58, minSize: 32, maxLines: 2, weight: 800,
  });
  let detailsTop = 546;
  if (cleanText(pass.designation)) {
    drawTextBlock(ctx, pass.designation || '', {
      top: detailsTop, height: 44, width: 816, size: 34, minSize: 23, maxLines: 1, weight: 450,
    });
    detailsTop += 56;
  }
  drawTextBlock(ctx, pass.company, {
    top: detailsTop, height: 62, width: 820, size: 35, minSize: 23, maxLines: 2, weight: 450,
  });
  if (cleanText(pass.country)) {
    drawTextBlock(ctx, pass.country || '', {
      top: detailsTop + 72, height: 40, width: 816, size: 32, minSize: 23, maxLines: 1, weight: 450,
    });
  }

  if (pass.qrDataUrl) {
    const qr = await loadImage(pass.qrDataUrl);
    ctx.drawImage(qr, 243, 728, 414, 414);
  }

  const visitorId = 'IM-' + cleanText(pass.registrationNumber).replace(/\D/g, '').slice(-6);
  drawTextBlock(ctx, 'Visitor ID: ' + visitorId, {
    top: 1148, height: 44, width: 820, size: 26, minSize: 17, maxLines: 1, weight: 450,
  });

  ctx.fillStyle = '#00A651';
  ctx.fillRect(32, 1236, width - 64, 128);
  ctx.fillStyle = '#000000';
  ctx.font = '700 42px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VISITOR', width / 2, 1300);

  return canvas;
}

export async function generateVisitorBadgeDataUrl(pass: VisitorPass): Promise<string> {
  const canvas = await renderVisitorBadgeCanvas(pass);
  return canvas.toDataURL('image/webp');
}

export async function generateVisitorBadgeBlob(pass: VisitorPass): Promise<Blob> {
  const canvas = await renderVisitorBadgeCanvas(pass);
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Could not create badge blob'));
    }, 'image/webp');
  });
}

export async function downloadVisitorBadge(pass: VisitorPass) {
  const dataUrl = await generateVisitorBadgeDataUrl(pass);
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = pass.registrationNumber + '.webp';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
