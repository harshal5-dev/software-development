package practice;

public class Practice3 {


  static long[] rangeSumQuery(int[] A, int[][] B) {
    int N = A.length;
    long[] prefixSum = new int[N];
    int M = B.length;
    long[] result = new int[M];

    prefixSum[0] = A[0];
    for (int i = 1; i < N; i++) {
      prefixSum[i] = prefixSum[i - 1] + A[i];
    }

    for (int index = 0; index < M; index++) {
      int letf = B[0][index];
      int right = B[0][index];

      long sum = prefixSum[right];

      if (letf > 0) {
        sum -= prefixSum[letf - 1];
      }

      result[index] = sum;
    }

    return result;
  }

  static void prefixSum(int[] A) {
    int N = A.length;

    for (int index = 1; index < N; index++) {
      A[index] = A[index - 1] + A[index];
    }

  }

  static int findEquilibriumIndex(int[] A) {
    int N = A.length;
    int[] prefixSum = new int[N];

    prefixSum[0] = A[0];

    for (int index = 1; index < N; index++) {
      prefixSum[index] = prefixSum[index - 1] + A[index];
    }

    if (prefixSum[N - 1] - prefixSum[0] == 0) {
      return 0;
    }

    for (int index = 1; index < N; index++) {
      int letfSum = prefixSum[index - 1];
      int rightSum = prefixSum[N - 1] - prefixSum[index];

      if (letfSum == rightSum) {
        return index;
      }
    }

    return -1;
  }

  static int evenNumberInRange(int[] A, int[][] B) {
    int N = A.length;
    int[] prefixCount = new int[N];
    int M = B.length;
    int[] result = new int[M];

    prefixCount[0] = (A[0] & 1) == 0 ? 1 : 0;

    for (int index = 1; index < N; index++) {
      prefixCount[index] = prefixCount[index - 1] + (A[index] & 1) == 0 ? 1 : 0;
    }

    for (int index = 0; index < M; index++) {
      int letf = B[0][index];
      int right = B[0][index];

      int count = prefixCount[right];

      if (letf > 0) {
        count -= prefixCount[letf - 1];
      }

      result[index] = count;
    }

    return result;
  }
}
