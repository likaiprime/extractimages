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
    title: "从Office文档中提取图片",
    description: "轻松从Word、PowerPoint和Excel文件中提取图片。无需上传服务器 - 所有处理都在您的浏览器中完成！",
    features: {
      privacy: {
        title: "隐私优先",
        description: "文件完全在您的浏览器中处理，不会上传到任何服务器。"
      },
      formats: {
        title: "多种格式",
        description: "支持Word (.docx)、PowerPoint (.pptx)和Excel (.xlsx)文件。"
      },
      speed: {
        title: "快速简便",
        description: "只需拖放文件，几秒钟内即可获取图片。"
      }
    },
    footer: "版权所有"
  }
} as const;

export default dictionary;
