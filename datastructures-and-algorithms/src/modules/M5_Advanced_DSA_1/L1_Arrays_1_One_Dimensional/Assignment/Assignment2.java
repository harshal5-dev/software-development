package modules.M5_Advanced_DSA_1.L1_Arrays_1_One_Dimensional.Assignment;

import java.util.Arrays;

public class Assignment2 {
  /*
   * Problem Description
   * There are A beggars sitting in a row outside a temple. Each beggar initially
   * has an empty pot. When the devotees come to the temple, they donate some
   * amount of coins to these beggars. Each devotee gives a fixed amount of
   * coin(according to their faith and ability) to some K beggars sitting next to
   * each other.
   *
   * Given the amount P donated by each devotee to the beggars ranging from L to R
   * index, where 1 <= L <= R <= A, find out the final amount of money in each
   * beggar's pot at the end of the day, provided they don't fill their pots by
   * any other means.
   * For ith devotee B[i][0] = L, B[i][1] = R, B[i][2] = P, given by the 2D array
   * B
   *
   *
   * Problem Constraints
   * 1 <= A <= 2 * 10^5
   * 1 <= L <= R <= A
   * 1 <= P <= 10^3
   * 0 <= len(B) <= 10^5
   */
  static int[] solve(int A, int[][] B) {
    int[] ans = new int[A];
    int N = B.length;

    for (int[] ele : B) {
      int startIndex = ele[0] - 1;
      int endIndex = ele[1] - 1;
      int value = ele[2];

      ans[startIndex] += value;
      if (endIndex < A - 1) {
        ans[endIndex + 1] -= value;
      }
    }

    for (int index = 1; index < A; index++) {
      ans[index] += ans[index - 1];
    }

    return ans;
  }

  public static void main(String[] args) {
    int[][] arrB = { { 1, 2, 10 }, { 2, 3, 20 }, { 2, 5, 25 } };

    System.out.println();
    System.out.println(Arrays.toString(solve(5, arrB)));
    System.out.println();
  }

}
