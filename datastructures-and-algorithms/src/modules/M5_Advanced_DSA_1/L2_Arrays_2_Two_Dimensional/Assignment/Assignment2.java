package modules.M5_Advanced_DSA_1.L2_Arrays_2_Two_Dimensional.Assignment;

public class Assignment2 {

  static long[][] prefix2DSum(int[][] A) {
    int N = A.length;
    int M = A[0].length;
    long[][] prefixSum = new long[N][M];

    for (int row = 0; row < N; row++) {
      prefixSum[row][0] = A[row][0];

      for (int col = 1; col < M; col++) {
        prefixSum[row][col] = prefixSum[row][col-1] + A[row][col];
      }
    }

    for (int col = 0; col < M;col++) {
      prefixSum[0][col] = prefixSum[0][col];

      for (int row = 1; row < N; row++) {
        prefixSum[row][col] = prefixSum[row-1][col] + prefixSum[row][col];
      }
    }

    return prefixSum;
  }

  static int[] solve(int[][] A, int[] B, int[] C, int[] D, int[] E) {
    int N = B.length;
    int[] ans = new int[N];
    long[][] prefixSum = prefix2DSum(A);
    int mod = 1000000007;

    for (int index = 0; index < N; index++) {
      int a1 = B[index] -1, b1 = C[index] -1;
      int a2 = D[index] -1, b2 = E[index] -1;

      long sum = prefixSum[a2][b2];
      if (b1 > 0) {
        sum -= prefixSum[a2][b1-1];
      }
      if (a1 > 0) {
        sum -= prefixSum[a1-1][b2];
      }
      if (a1 > 0 && b1 > 0) {
        sum += prefixSum[a1-1][b1-1];
      }

      while (sum < 0) {
        sum += mod;
      }

      ans[index] = (int) sum;
    }

    return ans;
  }
}
