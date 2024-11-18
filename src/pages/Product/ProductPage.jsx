import { useState, useEffect } from 'react';
import getAllProducts from '../../services/getAllProducts';
import CardList from '../../components/CardList/CardList';
import Navbar from '../../components/Navbar/Navbar';
import RadioButton from '../../components/RadioButton/RadioButton';

export default function ProductPage() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [searchTerm, setSearchTerm] = useState(''); 


  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts); 
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch; 
    });
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  const RadioButtonOpts = [
    { label: 'All', value: 'all' },
    { label: 'Deluxe Vinyl', value: 'Deluxe Vinyl' },
    { label: 'Vinyl', value: 'Vinyl' },
  ];

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="px-24 py-4">
        <div className="font-poppins">
          <h3 className="font-medium text-lg mb-2 text-[#fff]">Filter by Category</h3>
          <div className="flex gap-4 flex-wrap items-center">
            <RadioButton
              options={RadioButtonOpts}
              defaultValue="all"
              onChange={(value) => setSelectedCategory(value)} 
            />
          </div>
        </div>
      </div>
      <section className="container px-24 py-4">
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            <CardList products={filteredProducts} />
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </main>
      </section>
    </>
  );
}
