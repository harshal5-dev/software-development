package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L5_Arrays_Prefix_Sum.Assignment;

public class Assignment5 {

  static int[] prefixSum(int[] A) {
    int N = A.length;
    int[] prefixSum = new int[N];

    prefixSum[0] = A[0];

    for (int index = 1; index < N; index++) {
      prefixSum[index] = prefixSum[index - 1] + A[index];
    }

    return prefixSum;
  }

  static int solve(int[] A) {
    int[] prefixSum = prefixSum(A);
    int N = A.length;

    for (int index = 0; index < N; index++) {
      int leftSum = 0;
      int rightSum;

      if (index > 0) {
        leftSum = prefixSum[index-1];
      }

      rightSum = prefixSum[N-1] - prefixSum[index];

      if (leftSum == rightSum) {
        return index;
      }
    }

    return -1;
  }
}
