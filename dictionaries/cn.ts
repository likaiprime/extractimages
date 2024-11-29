const dictionary = {
  navigation: {
    home: "首页",
    about: "关于",
    contact: "联系我们",
  },
  common: {
    upload: "上传",
    download: "下载",
    extract: "提取",
    settings: "设置",
  },
  messages: {
    success: "操作成功",
    error: "发生错误",
    loading: "加载中...",
  },
  errors: {
    notFound: {
      title: "404 - 页面未找到",
      message: "您访问的页面不存在。",
    }
  },
  home: {
    title: "Office文档图片提取工具",
    subtitle: "免费在线提取Office文档中的图片",
    description: "从Word、PowerPoint和Excel文件中即时提取图片。100%免费、安全，直接在浏览器中运行！",
    features: {
      privacy: {
        title: "100%私密安全",
        description: "所有处理都在您的浏览器中完成。文件永远不会上传到任何服务器，确保完全的隐私。"
      },
      speed: {
        title: "极速处理",
        description: "几秒钟内完成图片提取。无需等待上传下载，在浏览器中即时处理。"
      },
      formats: {
        title: "支持所有Office格式",
        description: "支持Microsoft Word (.docx)、PowerPoint (.pptx)和Excel (.xlsx)文件。"
      },
      batch: {
        title: "批量处理",
        description: "同时从多个文件中提取图片。批量处理提高效率。"
      },
      quality: {
        title: "原始品质",
        description: "获取原始分辨率和质量的图片。无压缩，无质量损失。"
      },
      noInstall: {
        title: "无需安装",
        description: "直接在网页浏览器中运行。无需下载或安装任何软件。"
      }
    },
    faq: {
      title: "常见问题",
      items: [
        {
          question: "如何从Office文档中提取图片？",
          answer: "只需将您的Office文档（Word、PowerPoint或Excel）拖放到我们的工具上，或点击选择文件。我们的工具将自动提取所有图片，让您一键下载。无需手动操作！"
        },
        {
          question: "如何保存高分辨率图片？",
          answer: "我们的工具会自动以原始分辨率提取图片。在提取过程中不会有任何质量损失，确保您获得文档中最高质量的图片。"
        },
        {
          question: "能否同时提取多张图片？",
          answer: "当然可以！我们的工具会同时提取文档中的所有图片。您可以单独下载每张图片，或将所有图片打包成ZIP文件一次性下载。"
        },
        {
          question: "支持哪些图片格式？",
          answer: "我们支持Office文档中的所有常见图片格式，包括PNG、JPEG、GIF和SVG。图片会以原始格式提取，以保持质量。"
        },
        {
          question: "我的文档处理安全吗？",
          answer: "绝对安全！我们的工具在您的浏览器本地处理所有内容。您的文档永远不会上传到任何服务器，确保数据的完全隐私和安全。"
        }
      ]
    },
    footer: "版权所有"
  }
} as const;

export default dictionary;
