import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import getAllProducts from "../../services/getAllProducts";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const allProducts = getAllProducts();
    const product = allProducts.find((prod) => prod.slug === slug);
    setProduct(product);
  }, []);

  if (!product) {
    return (
      <>
        <h1 className="flex w-full h-full text-center items-center justify-center text-4xl text-[#A52A2A]">
          PRODUCT NOT FOUND.
        </h1>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="flex px-24 py-4 gap-[48px] items-center font-poppins">
        <Link to="/">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="mb-0 text-[40px] text-[#5C4033] hover:text-[#8B5A2B] transition duration-300"
          />
        </Link>
        <h4 className="text-[38px] font-bold text-[#fff]">{product.name ?? "No Label"}</h4>
      </div>
      <div className="flex gap-[30px] px-24 font-poppins">
        <div>
          <img
            src={product.imageUrl ?? (product.name ?? "No Name")}
            alt={product.name ?? "No Name"}
            className="block w-[700px] h-[500px] object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          <span className="text-[40px] font-bold text-[#D1BFA7]">
            {formatToIDRCurrency(product.price) ?? `Not For Sale`}
          </span>
          {product.stock > 0 ? (
            product.stock <= 10 ? (
              <span className="font-medium text-[yellow]">Available, almost out of stock</span>
            ) : (
              <span className="font-medium text-[#fff]">Available</span>
            )
          ) : (
            <span className="font-medium text-[#A52A2A]">Out of stock</span>
          )}

          <span className="text-[#F8EDE3]">{product.category ?? "Uncategorized"}</span>

          {product.stock > 0 ? (
            <div>
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-4 bg-[#C2B280] text-center hover:bg-[#fff] text-[#5C4033] active:bg-[#8B5A2B] rounded-lg"
              >
                <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                <span>Add to cart</span>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-4 bg-[#9A9A9A] text-center rounded-lg"
              >
                <FontAwesomeIcon icon={faCartShopping} className="mb-0 text-white" />
                <span className="text-[#F3F3F3]">Add to cart</span>
              </Button>
            </div>
          )}

          <span className="font-bold text-[18px] text-[#fff]">Description</span>
          <p className="max-w-[500px] text-[#F8EDE3]">
            {product.description ?? "No description."}
          </p>
        </div>
      </div>
    </>
  );
}
