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
    title: "Extract Images from Office Documents",
    description: "Easily extract images from Word, PowerPoint, and Excel files. No upload to server - everything happens in your browser!",
    features: {
      privacy: {
        title: "Privacy First",
        description: "Files are processed entirely in your browser. Nothing is uploaded to any server."
      },
      formats: {
        title: "Multiple Formats",
        description: "Support for Word (.docx), PowerPoint (.pptx), and Excel (.xlsx) files."
      },
      speed: {
        title: "Fast & Easy",
        description: "Just drag and drop your file, and get your images in seconds."
      }
    },
    footer: "All rights reserved."
  }
} as const;

export default dictionary;
