package modules.M5_Advanced_DSA_1.L2_Arrays_2_Two_Dimensional.Assignment;

public class Assignment3 {

  static long[][] suffix2DSum(int[][] A) {
    int N = A.length;
    int M = A[0].length;
    long[][] suffixSum = new long[N][M];

    for (int row = N-1; row >= 0; row--) {
      suffixSum[row][M-1] = A[row][M-1];

      for (int col = M-2; col >= 0; col--) {
        suffixSum[row][col] = suffixSum[row][col+1] + A[row][col];
      }
    }

    for (int col = M-1; col >= 0; col--) {
      suffixSum[N-1][col] = suffixSum[N-1][col];

      for (int row = N-2; row >= 0; row--) {
        suffixSum[row][col] += suffixSum[row+1][col];
      }
    }

    return suffixSum;
  }

  static long solve(int[][] A) {
    long ans = Long.MIN_VALUE;
    int N = A.length;
    int M = A[0].length;
    long[][] suffixSum = suffix2DSum(A);

    for (int row = 0; row < N; row++) {
      for (int col = 0; col < M; col++) {
        long sum = suffixSum[row][col];
        ans = Math.max(ans, sum);
      }
    }

    return ans;
  }

}
