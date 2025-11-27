import { ProductsTable } from '@/components/about/ClientTable/ClientTable';
import { apiGet } from '@/lib/api/fetcher';
import { generateRandomRating } from '@/lib/utils/generateRandomRating';
import { Product } from '@/types/Product';

export default async function AboutPage() {
  let products = await apiGet<Product[]>('/products');

  products = products.map(p => ({
    ...p,
    rating: generateRandomRating(),
  }));

  return (
    <div>
      <h1>About this project</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores,
        adipisci a aperiam voluptatibus quos consequuntur dolores quidem
        officiis! Ex, maxime ut? Alias omnis, consequuntur ut similique nobis
        fugiat fuga? Quia.
      </p>

      <ProductsTable products={products} />
    </div>
  );
}
