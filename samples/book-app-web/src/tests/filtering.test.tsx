import { describe, expect, it } from "vitest";
import { filterBooks, type BookFiltersState } from "../App";
import { books } from "../data/books";

const defaultFilters: BookFiltersState = {
  searchTerm: "",
  selectedGenre: "all",
  readingStatus: "all"
};

describe("filterBooks", () => {
  it("matches title and author searches without depending on letter case", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "hobbit"
    });

    expect(results.map((book) => book.title)).toEqual(["The Hobbit"]);
  });

  it("returns same results for uppercase and lowercase searches (regression test)", () => {
    const lowercaseResults = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "wizard"
    });

    const uppercaseResults = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "WIZARD"
    });

    const mixedcaseResults = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "WiZaRd"
    });

    expect(lowercaseResults).toEqual(uppercaseResults);
    expect(lowercaseResults).toEqual(mixedcaseResults);
    expect(lowercaseResults.map((book) => book.title)).toEqual(["A Wizard of Earthsea"]);
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });
});
