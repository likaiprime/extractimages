"use client";

import { FileUpload } from '@/components/file-upload';

interface UploadSectionProps {
  acceptTypes?: string
}

export default function UploadSection({ acceptTypes }: UploadSectionProps) {
  return (
    <div className="w-full mb-16">
      <FileUpload acceptedFileTypes={acceptTypes?.split(',') || []} />
    </div>
  );
}
