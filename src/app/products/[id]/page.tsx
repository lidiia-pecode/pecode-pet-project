import { ProductDetailsPage } from '@/components/product-details-page';
import { getProductById } from '@/lib';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const idString = resolvedParams.id;

  const product = await getProductById(Number(idString));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
   <ProductDetailsPage product={product} />
  );
}
