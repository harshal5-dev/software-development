package modules.M5_Advanced_DSA_1.L1_Arrays_1_One_Dimensional.Assignment;

public class Assignment1 {
  /*
   * Problem Description
   * Given an array A of length N, your task is to find the maximum
   * possible sum of any non-empty contiguous subarray.
   * In other words, among all possible subarrays of A,
   * determine the one that yields the highest sum and return that sum.
   *
   * Problem Constraints
   * 1 <= N <= 1e6
   * -1000 <= A[i] <= 1000
   */
  static int maxSubArray(final int[] A) {
    int ans = Integer.MIN_VALUE;
    int currentSum = 0;

    for (int ele: A) {
      currentSum += ele;
      ans = Math.max(ans, currentSum);

      if (currentSum < 0) {
        currentSum = 0;
      }
    }

    return ans;
  }

  public static void main(String[] args) {
    int[] arr1 = { 1, 2, 3, 4, -10 };
    int[] arr2 = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };

    System.out.println();
    System.out.println(maxSubArray(arr1));
    System.out.println("-----------");
    System.out.println(maxSubArray(arr2));
    System.out.println();
  }
}
