package modules.M5_Advanced_DSA_1.L1_Arrays_1_One_Dimensional.Lecture;

import util.CommonUtil;

import java.util.Arrays;

public class BaggersProblemPart1 {

  /*
   * Q Initially all elements of an arr[N] are 0.
   * Then you are given Q queries. every query contains
   * i index and value. Incremented element from ith index
   * to last index by value. return final state of arr[].
   */
  static int[] zeroQueriesI(int A, int[][] B) {
    int[] ans = new int[A];

    for (int[] ele : B) {
      int startIndex = ele[0];
      int value = ele[1];

      ans[startIndex] += value;
    }

    for (int index = 1; index < A; index++) {
      ans[index] += ans[index -1];
    }

    return ans;
  }

  public static void main(String[] args) {
    int[][] arrB1 = { { 3, 4 }, { 1, 3 }, { 4, -2 }, { 3, 1 } };

    System.out.println();
    System.out.println("""
        Q Initially all elements of an arr[N] are 0.
        Then you are given Q queries. every query contains
        i index and value. Incremented element from ith index
        to last index by value. return final state of arr[].""");
    System.out.println("--------------------------------------------------");
    System.out.println("Time Complexity -> O(Q+N)");
    System.out.println("Space Complexity -> O(1)");
    System.out.println("-----------------------------------");
    System.out.println("Input Array ->");
    CommonUtil.print2DArray(arrB1);
    System.out.println("Output ->");
    System.out.println(Arrays.toString(zeroQueriesI(5, arrB1)));
    System.out.println();
  }
}
