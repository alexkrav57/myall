import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeftPanel from "../LeftPanel";
import {
  mockItems,
  mockCategories,
  simulateDragAndDrop,
} from "../../../utils/testUtils";

describe("LeftPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<LeftPanel />);
    expect(screen.getByText("MyAll Extension")).toBeInTheDocument();
  });

  test("search functionality works", async () => {
    render(<LeftPanel />);
    const searchInput = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "Test Item 1");
    expect(screen.getByText("Test Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Item 2")).not.toBeInTheDocument();
  });

  test("category expansion works", async () => {
    render(<LeftPanel />);
    const categoryHeader = screen.getByText("Important");
    await userEvent.click(categoryHeader);
    expect(screen.getByText("Test Item 1")).toBeInTheDocument();
  });

  // Add more tests...
});
