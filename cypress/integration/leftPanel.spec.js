describe("LeftPanel", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load items correctly", () => {
    cy.get(".list-item").should("have.length.gt", 0);
  });

  it("should filter items when searching", () => {
    cy.get(".search-input").type("Test Item 1");
    cy.get(".list-item").should("have.length", 1);
  });

  it("should allow drag and drop between categories", () => {
    cy.get(".list-item")
      .first()
      .trigger("mousedown", { button: 0 })
      .trigger("mousemove", { clientX: 100, clientY: 100 })
      .trigger("mouseup");
  });

  it("should handle category expansion", () => {
    cy.get(".category-header").first().click();
    cy.get(".category-items").should("be.visible");
  });

  // Add more test cases...
});
