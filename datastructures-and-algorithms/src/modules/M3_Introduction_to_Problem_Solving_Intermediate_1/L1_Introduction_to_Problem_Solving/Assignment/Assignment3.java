package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L1_Introduction_to_Problem_Solving.Assignment;

public class Assignment3 {

  /*
   * Problem Description
   * Given a number A. Return square root of the number if it is a perfect square
   * otherwise return -1.
   *
   * Problem Constraints
   * 1 <= A <= 10^8
   */
  static int solve(int A) {

    for (int num = 1; num * num <= A; num++) {
      if (num * num == A) {
        return num;
      }
    }

    return -1;
  }

  public static void main(String[] args) {

    System.out.println();
    System.out.println(solve(4));
    System.out.println("--------");
    System.out.println(solve(1001));
    System.out.println();
  }
}
