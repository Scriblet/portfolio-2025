import type { ImgHTMLAttributes } from "react";

export type PictureSources = {
  /** srcset AVIF já montado (ex.: "a.avif 480w, b.avif 800w"). */
  avif: string;
  /** srcset WebP já montado. */
  webp: string;
  /** JPEG da maior largura, fallback universal. */
  fallback: string;
  /** Dimensões intrínsecas do fallback (evitam layout shift). */
  width: number;
  height: number;
  /** `sizes` do navegador; sem ele o navegador assume 100vw. */
  sizes?: string;
};

type ResponsivePictureProps = PictureSources & {
  alt: string;
  className?: string;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  decoding?: ImgHTMLAttributes<HTMLImageElement>["decoding"];
  fetchPriority?: ImgHTMLAttributes<HTMLImageElement>["fetchPriority"];
  /** Atributo `data-testid` aplicado ao `<img>`. */
  testId?: string;
};

/**
 * `<picture>` com AVIF → WebP → JPEG e `srcset` por largura.
 *
 * O wrapper usa `display: contents` para o `<img>` continuar participando do
 * layout do elemento pai exatamente como um `<img>` direto faria. Os estilos
 * existentes (object-fit, grid etc.) seguem valendo sem alterações.
 */
export const ResponsivePicture = ({
  avif,
  webp,
  fallback,
  width,
  height,
  sizes,
  alt,
  className,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  testId,
}: ResponsivePictureProps) => (
  <picture style={{ display: "contents" }}>
    <source type="image/avif" srcSet={avif} sizes={sizes} />
    <source type="image/webp" srcSet={webp} sizes={sizes} />
    <img
      src={fallback}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      data-testid={testId}
    />
  </picture>
);
