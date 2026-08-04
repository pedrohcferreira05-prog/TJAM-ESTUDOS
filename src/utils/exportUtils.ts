import { MindMap } from '../types';

/**
 * Downloads SVG mindmap as a standalone SVG file
 */
export function exportToSVG(svgElement: SVGElement, filename: string) {
  try {
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);

    // Ensure XML namespaces
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+xmlns\:xlink="http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Erro ao exportar SVG:', err);
  }
}

/**
 * Converts SVG element to high-res PNG image download
 */
export function exportToPNG(containerElement: HTMLElement, filename: string) {
  try {
    const svgElement = containerElement.querySelector('svg');
    if (!svgElement) {
      alert('Elemento gráfico do Mapa Mental não encontrado.');
      return;
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = 2; // High resolution 2x
      const width = (svgElement.clientWidth || 1200) * scale;
      const height = (svgElement.clientHeight || 800) * scale;

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        const pngURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngURL;
        downloadLink.download = `${filename}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
      URL.revokeObjectURL(blobURL);
    };
    image.src = blobURL;
  } catch (err) {
    console.error('Erro ao exportar PNG:', err);
  }
}

/**
 * Generates high quality printable document window for PDF saving or direct printing
 */
export function printOrExportPDF(mindMap: MindMap, containerElement: HTMLElement) {
  try {
    const svgElement = containerElement.querySelector('svg');
    if (!svgElement) {
      alert('Elemento gráfico não encontrado.');
      return;
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor, permita popups para imprimir ou gerar PDF.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${mindMap.title} - Mapa Mental</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 10mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 20px;
              background-color: #ffffff;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 12px;
              margin-bottom: 20px;
            }
            .title {
              font-size: 24px;
              font-weight: 700;
              color: #0f172a;
              margin: 0 0 4px 0;
            }
            .subtitle {
              font-size: 14px;
              color: #475569;
              margin: 0;
            }
            .meta {
              text-align: right;
              font-size: 12px;
              color: #64748b;
            }
            .badge {
              display: inline-block;
              background-color: #f1f5f9;
              color: #0f172a;
              padding: 4px 10px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 600;
              margin-left: 6px;
            }
            .canvas-container {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 10px;
            }
            svg {
              width: 100%;
              max-height: 70vh;
              height: auto;
            }
            .footer {
              margin-top: 20px;
              border-top: 1px dashed #cbd5e1;
              padding-top: 10px;
              font-size: 11px;
              color: #94a3b8;
              display: flex;
              justify-content: space-between;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="title">${mindMap.title}</h1>
              <p class="subtitle">${mindMap.disciplineName} &bull; Assunto: ${mindMap.topic}</p>
            </div>
            <div class="meta">
              <div>Autor: <strong>${mindMap.author}</strong></div>
              <div>Data: ${new Date(mindMap.updatedAt).toLocaleDateString('pt-BR')}</div>
              <div style="margin-top:4px;">
                <span class="badge">Nível: ${mindMap.level.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div class="canvas-container">
            ${svgString}
          </div>

          <div class="footer">
            <span>Mapas Mentais - Plataforma Interativa de Estudo</span>
            <span>Documento gerado para estudo pessoal</span>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  } catch (err) {
    console.error('Erro ao imprimir/PDF:', err);
  }
}

/**
 * Copies share link to clipboard with confirmation
 */
export function copyShareLink(mapId: string): Promise<boolean> {
  const shareUrl = `${window.location.origin}${window.location.pathname}?mapId=${mapId}`;
  return navigator.clipboard.writeText(shareUrl)
    .then(() => true)
    .catch(() => false);
}
