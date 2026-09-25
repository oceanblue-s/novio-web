/**
 * Utilities for client-side image compression and safe localStorage handling.
 * Prevents browser QuotaExceededError by resizing and compressing uploaded photos.
 */

export async function compressImageFile(
  file: File,
  maxWidth: number = 1000,
  maxHeight: number = 1000,
  quality: number = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not an image, resolve with plain data URL
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to uncompressed if canvas context is unavailable
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Safely saves data to localStorage, catching QuotaExceededError and alerting the user if needed.
 */
export function safeSetLocalStorage(key: string, value: string): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (err: any) {
    console.warn(`[NOVIO Storage] Quota exceeded while saving "${key}":`, err);
    if (err?.name === 'QuotaExceededError' || err?.code === 22) {
      alert(
        'Penyimpanan lokal browser penuh. Disarankan menggunakan link URL gambar daripada upload foto berukuran besar.'
      );
    }
    return false;
  }
}

/**
 * Safely parses JSON string, returning a fallback value if parsing fails or input is null/invalid.
 */
export function safeJsonParse<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed !== undefined && parsed !== null ? (parsed as T) : fallback;
  } catch (err) {
    console.warn('[NOVIO Storage] Failed to parse JSON, using fallback:', err);
    return fallback;
  }
}
