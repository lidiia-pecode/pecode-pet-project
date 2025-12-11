export const uploadImages = async (files: File[]): Promise<string[]> => {
  const uploadedUrls = await Promise.all(
    files.map(async file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'pecode');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dsuzqdhg7/image/upload',
        { method: 'POST', body: formData }
      );

      if (!res.ok) {
        throw new Error(`Failed to upload ${file.name}`);
      }

      const data = await res.json();
      return data.secure_url;
    })
  );

  return uploadedUrls;
};
