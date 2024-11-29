const dictionary = {
  navigation: {
    home: "首頁",
    about: "關於",
    faq: "常見問題"
  },
  common: {
    upload: "上傳",
    download: "下載",
    extract: "提取",
    settings: "設定",    siteName: "ExtractImages.Net",
    titleFormat: "{title} | ExtractImages.Net"
  },
  messages: {
    success: "操作成功",
    error: "發生錯誤",
    loading: "載入中...",
  },
  header: {
    title: "免費Office文件圖片提取器"
  },
  home: {
    title: "Office文件圖片提取工具",
    subtitle: "免費線上提取Office文件中的圖片",
    description: "從Word、PowerPoint和Excel檔案中即時提取圖片。100%免費、安全，直接在瀏覽器中執行！",
    features: {
      privacy: {
        title: "100%私密安全",
        description: "所有處理都在您的瀏覽器中完成。檔案永遠不會上傳到任何伺服器，確保完全的隱私。"
      },
      speed: {
        title: "快速處理",
        description: "採用最新的瀏覽器技術，實現快速的圖片提取。無需等待上傳和處理時間。"
      },
      formats: {
        title: "支援多種格式",
        description: "支援所有主流Office文件格式，包括Word、PowerPoint和Excel檔案。"
      },
      batch: {
        title: "批次處理",
        description: "一次性處理多個文件，自動提取所有圖片。提高工作效率。"
      },
      quality: {
        title: "原圖提取",
        description: "保持原始圖片品質，無損提取文件中的所有圖片。"
      },
      noInstall: {
        title: "無需安裝",
        description: "完全基於瀏覽器，無需下載安裝任何軟體。隨時隨地使用。"
      }
    },
    upload: {
      dropzone: {
        title: "拖曳檔案到此處",
        description: "支援 .docx, .pptx, .xlsx 格式",
        or: "或",
        browse: "瀏覽檔案",
        hint: "點擊或拖曳檔案到此區域"
      },
      status: {
        uploading: "上傳中...",
        processing: "處理中...",
        success: "處理完成！",
        error: "處理失敗",
        ready: "準備下載"
      },
      button: {
        upload: "選擇檔案",
        cancel: "取消",
        clear: "清除",
        download: "下載圖片"
      },
      message: {
        maxSize: "檔案大小不能超過 50MB",
        invalidType: "不支援的檔案類型",
        noImages: "未找到圖片",
        error: "處理失敗，請重試"
      }
    },
    about: {
      title: "關於免費Office文件圖片提取器",
      description1: "我們的免費Office文件圖片提取工具是一個專門為提取各種辦公文件中的圖片而設計的強大工具。無論您需要從Word文件、PowerPoint簡報還是Excel試算表中提取圖片，我們的工具都能讓這個過程變得簡單高效。",
      description2: "作為一個專業的Office文件圖片提取工具，我們專注於為使用者提供流暢的體驗，幫助他們提取和管理文件中的圖片。我們的工具支援所有常見的辦公檔案格式，確保您可以從任何類型的文件中提取圖片。",
      keyFeatures: {
        title: "核心功能",
        items: [
          "✓ 從Word文件中提取圖片",
          "✓ 從PowerPoint簡報中提取圖片",
          "✓ 從Excel試算表中提取圖片",
          "✓ 支援批次圖片提取"
        ]
      },
      whyChoose: {
        title: "為什麼選擇我們",
        items: [
          "✓ 免費的Office文件圖片提取",
          "✓ 快速高效的處理",
          "✓ 安全的文件處理",
          "✓ 無需註冊"
        ]
      }
    },
    faq: {
      title: "常見問題",
      items: [
        {
          question: "如何從Office文件中提取圖片？",
          answer: "只需將您的Office文件（Word、PowerPoint或Excel）拖放到我們的工具上，或點擊選擇檔案。我們的工具將自動提取所有圖片，讓您一鍵下載。無需手動操作！"
        },
        {
          question: "如何保存高解析度圖片？",
          answer: "我們的工具會自動以原始解析度提取圖片。在提取過程中不會有任何品質損失，確保您獲得文件中最高品質的圖片。"
        },
        {
          question: "能否同時提取多張圖片？",
          answer: "當然可以！我們的工具會同時提取文件中的所有圖片。您可以單獨下載每張圖片，或將所有圖片打包成ZIP檔案一次性下載。"
        },
        {
          question: "支援哪些圖片格式？",
          answer: "我們支援Office文件中的所有常見圖片格式，包括PNG、JPEG、GIF和SVG。圖片會以原始格式提取，以保持品質。"
        },
        {
          question: "我的文件處理安全嗎？",
          answer: "絕對安全！我們的工具在您的瀏覽器本地處理所有內容。您的文件永遠不會上傳到任何伺服器，確保資料的完全隱私和安全。"
        }
      ]
    },
    footer: "版權所有"
  }
} as const;

export default dictionary;