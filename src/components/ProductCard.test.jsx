import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  it("renders product and price", () => {
    render(<ProductCard name="Air Max" price={129} onAdd={() => {}} />);
    expect(screen.getByText("Air Max")).toBeInTheDocument();
    expect(screen.getByText("$129")).toBeInTheDocument();
  });

  it("calls onAdd when button is clicked", () => {
    const mockOnAdd = vi.fn();
    render(<ProductCard name="Air Max" price={129} onAdd={mockOnAdd} />);
    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith({ name: "Air Max", price: 129 });
  });

  it("does not render when name is empty", () => {
    render(<ProductCard name="" price={129} onAdd={() => {}} />);
    expect(screen.queryByRole("heading")).toBeEmptyDOMElement();
  });
});
