package modules.M5_Advanced_DSA_1.L1_Arrays_1_One_Dimensional.Assignment;

public class Assignment3 {
  /*
   * Problem Description
   * Imagine a histogram where the bars' heights are given by the array A. Each bar is of uniform width,
   * which is 1 unit. When it rains, water will accumulate in the valleys between the bars.
   * Your task is to calculate the total amount of water that can be trapped in these valleys.
   *
   * Example:
   * The Array A = [5, 4, 1, 4, 3, 2, 7] is visualized as below. The total amount of rain water trapped in A is 11.
   *
   * Problem Constraints
   * 1 <= |A| <= 10^5
   * 0 <= A[i] <= 10^5
   */
  static int trap(final int[] A) {
    int N = A.length;
    int[] leftMax = new int[N];
    int[] rightMax = new int[N];
    int ans = 0;

    leftMax[0] = A[0];
    rightMax[N-1] = A[N-1];

    for (int index = 1; index < N; index++) {
      leftMax[index] = Math.max(leftMax[index-1], A[index]);
    }

    for (int index = N-2; index >= 0;index--) {
      rightMax[index] = Math.max(rightMax[index + 1], A[index]);
    }

    for (int index = 0; index < N; index++) {
      int trappedUnits = Math.min(leftMax[index], rightMax[index]) - A[index];
      ans += trappedUnits;
    }

    return ans;
  }

  public static void main(String[] args) {
    int[] arr1 = { 0, 1, 0, 2 };
    int[] arr2 = { 1, 2 };

    System.out.println();
    System.out.println(trap(arr1));
    System.out.println("-----------");
    System.out.println(trap(arr2));
    System.out.println();
  }
}
