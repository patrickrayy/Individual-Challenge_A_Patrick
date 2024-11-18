import { useState, useEffect } from 'react';
import getAllProducts from '../../services/getAllProducts';
import CardList from '../../components/CardList/CardList';
import Navbar from '../../components/Navbar/Navbar';
import RadioButton from '../../components/RadioButton/RadioButton';

export default function ProductPage() {
  const [products, setProducts] = useState([]); // Full product list
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered product list
  const [selectedCategory, setSelectedCategory] = useState('all'); // Selected category
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  // Fetch all products when the component mounts
  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts); // Default to all products
  }, []);

  // Filter products based on selected category and search term
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch; // Must match both filters
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
      {/* Pass searchTerm and setSearchTerm to Navbar */}
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="px-24 py-4">
        <div className="font-poppins">
          <h3 className="font-medium text-lg mb-2 text-[#fff]">Filter by Category</h3>
          <div className="flex gap-4 flex-wrap items-center">
            <RadioButton
              options={RadioButtonOpts}
              defaultValue="all"
              onChange={(value) => setSelectedCategory(value)} // Update category
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
