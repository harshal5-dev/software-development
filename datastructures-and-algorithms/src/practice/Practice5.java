package practice;


public class Practice5 {


  static int[] subArray(int[] A, int B, int C) {
    int[] result = new int[C - B + 1];
    int resultIndex = 0;

    for (int index = B; index <= C; index++) {
      result[resultIndex] = A[index];
      resultIndex++;
    }

    return result;
  }

  static int maxSubArraySum(int A, int B, int[] C) {
    int ans = 0;

    for (int index = 0; index < A; index++) {
      int sum = 0;

      for (int jIndex = index; jIndex < A; jIndex++) {
        sum += C[jIndex];

        if (sum > B) {
          sum -= C[jIndex];
          break;
        }

        ans = Math.max(ans, sum);
      }
    }

    return ans;
  }

  static long allSubArraySum(int[] A) {
    int N = A.length;
    long result = 0;

    for (int index = 0; index < N; index++) {
      long contributionCount = (long) (N - index) * (index + 1);
      result += A[index] * contributionCount;
    }

    return result;
  }

  static int[][] generateAllSubArray(int[] A) {
    int N = A.length;
    int size = N * (N + 1) / 2;
    int[][] result = new int[size][];
    int resultIndex = 0;


    for (int index = 0; index < N; index++) {
      for (int jIndex = 0; jIndex < N; jIndex++) {
        int[] subArr = new int[jIndex - index + 1];
        int subArrIndex = 0;
        for (int kIndex = index; kIndex <= jIndex; kIndex++) {
          subArr[subArrIndex] = A[kIndex];
          subArrIndex++;
        }

        result[resultIndex] = subArr;
        resultIndex++;
      }
    }

    return result;
  }

}
