package practice;

public class Practice8 {

  static int[] spphieDicisibility(int[] A, int[][] B) {
    int N = A.length;
    int M = B.length;
    int[] prefixCount = new int[N];
    int[] result = new int[M];

    prefixCount[0] = A[0] % 5 == 0 ? 1 : 0;

    for (int index = 1; index < N; index++) {
      prefixCount[index] = prefixCount[index - 1] + (A[index] % 5 == 0 ? 1 : 0);
    }

    for (int index = 0; index < M; index++) {
      int left = B[index][0];
      int right = B[index][1];
      int count = prefixCount[right];

      if (left > 0) {
        count -= prefixCount[left - 1];
      }

      result[index] = count;
    }

    return result;
  }

  static int longestOddSubArray(int[] A) {
    int result = 0;
    int oddCount = 0;

    for (int ele : A) {
      if ((ele & 1) == 1) {
        oddCount++;
        result = Math.max(result, oddCount);
      } else {
        oddCount = 0;
      }
    }

    return result;
  }
}
