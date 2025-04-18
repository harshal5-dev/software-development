package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L1_Introduction_to_Problem_Solving.Assignment;

public class Assignment2 {

  /*
   * Problem Description
   * Given a number A. Return 1 if A is prime and return 0 if not.
   * Note:
   * The value of A can cross the range of Integers.
   *
   * Problem Constraints
   * 1 <= A <= 10^12
   */
  static int solve(long A) {
    int factorCount = 0;

    for (long num = 1; num * num <= A; num++) {
      if (A % num == 0) {
        factorCount += num * num == A ? 1 : 2;

        if (factorCount > 2) {
          return 0;
        }
      }
    }

    return factorCount == 2 ? 1 : 0;
  }

  public static void main(String[] args) {

    System.out.println();
    System.out.println(solve(5));
    System.out.println("------------");
    System.out.println(solve(10));
    System.out.println();
  }
}
