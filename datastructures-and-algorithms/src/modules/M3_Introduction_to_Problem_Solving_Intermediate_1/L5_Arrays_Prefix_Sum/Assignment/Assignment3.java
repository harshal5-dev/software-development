package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L5_Arrays_Prefix_Sum.Assignment;

public class Assignment3 {

  static long[] prefixSum(int[] A) {
    int N = A.length;
    long[] prefixSum = new long[N];

    prefixSum[0] = A[0];

    for (int index = 1; index < N; index++) {
      prefixSum[index] = prefixSum[index-1] + A[index];
    }

    return prefixSum;
  }

  static long[] rangeSum(int[] A, int[][] B) {
    long[] prefixSum = prefixSum(A);
    int N = B.length;
    long[] ans = new long[N];

    for (int index = 0; index < N; index++) {
      int leftIndex = B[index][0];
      int rightIndex = B[index][1];

      long sum;

      if (leftIndex == 0) {
        sum = prefixSum[rightIndex];
      } else {
        sum = prefixSum[rightIndex] - prefixSum[leftIndex-1];
      }

      ans[index] = sum;
    }

    return ans;
  }
}
