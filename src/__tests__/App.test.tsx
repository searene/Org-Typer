import {render, screen} from '@testing-library/react';
import { expect, describe, it } from 'vitest'
import App from '../App';

describe("App Test", () => {
  it("1 + 1 should equal 2", () => {
      console.log("abc");
      expect(1 + 1).toEqual(2);
  });

  // it("should show title", () => {
  //   render(<App />);
  //   expect(screen.getByText(/text/)).toBeDefined()
  // })
});