package practice;

class Practice7 {

  static void printMatrixBoundary(int[][] A, int N, int index, int jIndex) {
    if (N == 1) {
      System.out.print(A[index][jIndex]);
      return;
    }

    for (int kIndex = 0; kIndex < N; kIndex++) {
      System.out.print(A[index][jIndex]);
      jIndex++;
    }

    for (int kIndex = 1; kIndex < N; kIndex++) {
      System.out.print(A[index][jIndex]);
      index++;
    }

    for (int kIndex = 1; kIndex < N; kIndex++) {
      System.out.print(A[index][jIndex]);
      jIndex--;
    }

    for (int kIndex = 1; kIndex < N; kIndex++) {
      System.out.print(A[index][jIndex]);
      index--;
    }
  }

  static int sumLengthSubArray(int[] A, int B, int C) {
    int sum = 0;
    int N = A.length;

    for (int index = 0; index < B; index++) {
      sum += A[index];
    }

    if (sum == C) {
      return 1;
    }

    int s = 1;
    int e = B;

    while (e < N) {
      sum = sum - A[s - 1] + A[e];
      s++;
      e++;

      if (sum == C) {
        return 1;
      }
    }

    return 0;
  }

  static int minimumSwaps(int[] A, int B) {
    int N = A.length;
    int k = 0;

    for (int ele : A) {
      if (ele <= B) {
        k++;
      }
    }

    if (k == 0 || k == 1 || k == N) {
      return 0;
    }

    int badElement = 0;

    for (int index = 0; index < k; index++) {
      if (A[index] > B) {
        badElement++;
      }
    }

    int result = badElement;
    int s = 1;
    int e = k;

    while (e < N) {
      if (A[s - 1] > B) {
        badElement--;
      }
      if (A[e] > B) {
        badElement++;
      }

      result = Math.min(result, badElement);
      s++;
      e++;
    }

    return result;
  }

  static int setMatrix(int[][] A, int N, int index, int jIndex, int val) {
    if (N == 1) {
      A[index][jIndex] = val;
      return val;
    }

    for (int kIndex = 0; kIndex < N; kIndex++) {
      A[index][jIndex] = val;
      val++;
      jIndex++;
    }

    for (int kIndex = 1; kIndex < N; kIndex++) {
      A[index][jIndex] = val;
      val++;
      index++;
    }

    for (int kIndex = 1; kIndex < N; kIndex++) {
      A[index][jIndex] = val;
      val++;
      jIndex--;
    }

    for (int kIndex = 1; kIndex < N; kIndex++) {
      A[index][jIndex] = val;
      val++;
      index--;
    }

    return val;
  }

  static int[][] spiralOrderMatrix(int A) {
    int[][] result = new int[A][A];
    int N = result.length;
    int index = 0;
    int jIndex = 0;
    int val = 1;

    while (N > 0) {
      val = setMatrix(result, N, index, jIndex, val);
      index++;
      jIndex++;
      N -= 2;
    }

    return result;
  }
}
