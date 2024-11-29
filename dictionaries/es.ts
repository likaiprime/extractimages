const dictionary = {
  navigation: {
    home: "Inicio",
    about: "Acerca de",
    faq: "Preguntas frecuentes"
  },
  common: {
    upload: "Subir",
    download: "Descargar",
    extract: "Extraer",
    settings: "Configuración",    siteName: "ExtractImages.Net",
    titleFormat: "{title} | ExtractImages.Net"
  },
  messages: {
    success: "Operación exitosa",
    error: "Ha ocurrido un error",
    loading: "Cargando...",
  },
  header: {
    title: "Extractor gratuito de imágenes de documentos Office"
  },
  home: {
    title: "Extractor de imágenes de documentos Office",
    subtitle: "Herramienta en línea gratuita para extraer imágenes de documentos Office",
    description: "Extraiga imágenes instantáneamente de archivos Word, PowerPoint y Excel. ¡100% gratuito, seguro y funciona directamente en su navegador!",
    features: {
      privacy: {
        title: "100% Privado y Seguro",
        description: "Todo el procesamiento ocurre en su navegador. Sus archivos nunca se cargan a ningún servidor, garantizando total privacidad."
      },
      speed: {
        title: "Velocidad Relámpago",
        description: "Utilizando la última tecnología de navegador para una extracción rápida de imágenes. Sin esperas por cargas o procesamiento."
      },
      formats: {
        title: "Múltiples Formatos",
        description: "Soporte para todos los principales formatos de documentos Office, incluyendo archivos Word, PowerPoint y Excel."
      },
      batch: {
        title: "Procesamiento por Lotes",
        description: "Procese múltiples documentos a la vez y extraiga todas las imágenes automáticamente. Mejore la eficiencia."
      },
      quality: {
        title: "Calidad Original",
        description: "Mantenga la calidad original de la imagen, extraiga todas las imágenes de documentos sin pérdida."
      },
      noInstall: {
        title: "Sin Instalación",
        description: "Completamente basado en navegador, sin software para descargar o instalar. Use en cualquier lugar, en cualquier momento."
      }
    },
    upload: {
      dropzone: {
        title: "Suelte su archivo aquí",
        description: "Soporta formatos .docx, .pptx, .xlsx",
        or: "o",
        browse: "Explorar Archivos",
        hint: "Haga clic o arrastre el archivo a esta área"
      },
      status: {
        uploading: "Subiendo...",
        processing: "Procesando...",
        success: "¡Procesamiento completo!",
        error: "Falló el procesamiento",
        ready: "Listo para descargar"
      },
      button: {
        upload: "Seleccionar Archivo",
        cancel: "Cancelar",
        clear: "Limpiar",
        download: "Descargar Imágenes"
      },
      message: {
        maxSize: "El tamaño del archivo no puede exceder 50MB",
        invalidType: "Tipo de archivo no soportado",
        noImages: "No se encontraron imágenes",
        error: "Falló el procesamiento, por favor intente de nuevo"
      }
    },
    about: {
      title: "Acerca del extractor gratuito de imágenes de documentos Office",
      description1: "Nuestro extractor gratuito de imágenes de documentos Office es una herramienta poderosa diseñada específicamente para extraer imágenes de varios documentos Office. Ya sea que necesite extraer imágenes de documentos Word, presentaciones PowerPoint o hojas de cálculo Excel, nuestra herramienta hace que el proceso sea simple y eficiente.",
      description2: "Como herramienta especializada en extracción de imágenes de documentos Office, nos enfocamos en proporcionar una experiencia fluida para usuarios que necesitan extraer y gestionar imágenes de sus documentos Office. Nuestra herramienta soporta todos los formatos de archivo Office comunes.",
      keyFeatures: {
        title: "Características Principales",
        items: [
          "✓ Extraer imágenes de documentos Word",
          "✓ Extraer imágenes de diapositivas PowerPoint",
          "✓ Extraer imágenes de hojas de cálculo Excel",
          "✓ Soporte para extracción de imágenes por lotes"
        ]
      },
      whyChoose: {
        title: "Por qué elegirnos",
        items: [
          "✓ Extracción gratuita de imágenes de documentos Office",
          "✓ Procesamiento rápido y eficiente",
          "✓ Manejo seguro de documentos",
          "✓ No requiere registro"
        ]
      }
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        {
          question: "¿Cómo extraigo imágenes de documentos Office?",
          answer: "Simplemente arrastre y suelte su documento Office (Word, PowerPoint o Excel) en nuestra herramienta, o haga clic para seleccionar su archivo. Nuestra herramienta extraerá automáticamente todas las imágenes y le permitirá descargarlas con un solo clic. ¡No se necesita trabajo manual!"
        },
        {
          question: "¿Cómo guardo imágenes en alta resolución?",
          answer: "Nuestra herramienta extrae automáticamente las imágenes en su resolución original. No hay pérdida de calidad durante el proceso de extracción, asegurando que obtenga las imágenes de la más alta calidad posible de sus documentos."
        },
        {
          question: "¿Puedo extraer múltiples imágenes a la vez?",
          answer: "¡Sí! Nuestra herramienta extrae todas las imágenes de su documento simultáneamente. Puede descargarlas individualmente o como un único archivo ZIP que contiene todas las imágenes."
        },
        {
          question: "¿Qué formatos de imagen son soportados?",
          answer: "Soportamos todos los formatos de imagen comunes encontrados en documentos Office, incluyendo PNG, JPEG, GIF y SVG. Las imágenes se extraen en su formato original para mantener la calidad."
        },
        {
          question: "¿Mis documentos se manejan de forma segura?",
          answer: "¡Absolutamente! Nuestra herramienta procesa todo localmente en su navegador. Sus documentos nunca se cargan a ningún servidor, asegurando total privacidad y seguridad de sus datos."
        }
      ]
    },
    footer: "Todos los derechos reservados"
  }
} as const;

export default dictionary;