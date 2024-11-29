const dictionary = {
  navigation: {
    home: "Home",
    about: "About",
    contact: "Contact",
  },
  common: {
    upload: "Upload",
    download: "Download",
    extract: "Extract",
    settings: "Settings",
  },
  messages: {
    success: "Operation successful",
    error: "An error occurred",
    loading: "Loading...",
  },
  errors: {
    notFound: {
      title: "404 - Page Not Found",
      message: "The page you are looking for does not exist.",
    }
  },
  home: {
    title: "Office Document Image Extractor",
    subtitle: "Free Online Tool to Extract Images from Office Documents",
    description: "Extract images from Word, PowerPoint, and Excel files instantly. 100% free, secure, and works directly in your browser!",
    features: {
      privacy: {
        title: "100% Private & Secure",
        description: "All processing happens in your browser. Your files are never uploaded to any server, ensuring complete privacy."
      },
      speed: {
        title: "Lightning Fast",
        description: "Extract images in seconds. No waiting for uploads or downloads - instant processing right in your browser."
      },
      formats: {
        title: "All Office Formats",
        description: "Support for Microsoft Word (.docx), PowerPoint (.pptx), and Excel (.xlsx) files."
      },
      batch: {
        title: "Batch Processing",
        description: "Extract images from multiple files at once. Save time with efficient batch processing."
      },
      quality: {
        title: "Original Quality",
        description: "Get your images in their original resolution and quality. No compression or quality loss."
      },
      noInstall: {
        title: "No Installation",
        description: "Works directly in your web browser. No need to download or install any software."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How do I extract images from Office documents?",
          answer: "Simply drag and drop your Office document (Word, PowerPoint, or Excel) onto our tool, or click to select your file. Our tool will automatically extract all images and let you download them with just one click. No manual work needed!"
        },
        {
          question: "How do I save images in high resolution?",
          answer: "Our tool automatically extracts images in their original resolution. There's no quality loss during the extraction process, ensuring you get the highest quality images possible from your documents."
        },
        {
          question: "Can I extract multiple images at once?",
          answer: "Yes! Our tool extracts all images from your document simultaneously. You can download them individually or as a single ZIP file containing all images."
        },
        {
          question: "What image formats are supported?",
          answer: "We support all common image formats found in Office documents, including PNG, JPEG, GIF, and SVG. Images are extracted in their original format to maintain quality."
        },
        {
          question: "Are my documents handled securely?",
          answer: "Absolutely! Our tool processes everything locally in your browser. Your documents are never uploaded to any server, ensuring complete privacy and security of your data."
        }
      ]
    },
    footer: "All rights reserved."
  }
} as const;

export default dictionary;
