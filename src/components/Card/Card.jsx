import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import { Link } from "react-router-dom";

export default function Card({ product }) {
  return (
    <Link
      to={`/products/${product.slug}` ?? ""}
      className="flex flex-col max-w-[370px] p-[16px] bg-[#5C4033] rounded-lg hover:ring-opacity-40 hover:ring-4 hover:ring-[#000] active:ring-2 active:ring-opacity-90"
    >
      <div className="flex flex-col font-poppins">
        <img
          src={product.imageUrl ?? ""}
          alt={product.name ?? "No name"}
          className="block max-h-[300px] mb-4 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-[20px] text-[#EAEAEA]">
            {product.name ?? "No Name"}
          </h4>
          <span className="block font-medium text-[14px] text-[#D1BFA7]">
            {product.category ?? "Uncategorized"}
          </span>
          <span className="block font-medium text-[20px] text-[#F8EDE3]">
            {formatToIDRCurrency(product.price) ?? "Not for sale"}
          </span>
          <div>
            {product.stock <= 0 ? (
              <p className="text-xl font-semibold text-center text-[red]">
                Out of Stock
              </p>
            ) : product.stock <= 10 && product.stock !== 0 ? (
              <>
                <p className="text-xl font-semibold text-left text-[#F4A460]">
                  Almost Sold Out
                </p>
                <Button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 p-4 bg-[#C2B280] text-center hover:bg-[#967969] text-[#fff] active:bg-[#8B5A2B] rounded-lg"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                  <span>Add to cart</span>
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-4 bg-[#C2B280] text-center hover:bg-[#967969] text-[#fff] active:bg-[#8B5A2B] rounded-lg"
              >
                <FontAwesomeIcon icon={faCartShopping} className="mb-0" />
                <span>Add to cart</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  product: PropTypes.object,
};
