package practice;

public class Practice6 {

  static int maxRowWiseSum(int[][] A) {
    int N = A.length;
    int M = A[0].length;
    int ans = 0;

    for (int i = 0; i < N; i++) {
      int sum = 0;
      for (int j = 0; j < M; j++) {
        sum += A[i][j];
      }
      ans = Math.max(ans, sum);
    }

    return ans;
  }

  static int maxColWiseSum(int[][] A) {
    int N = A.length;
    int M = A[0].length;
    int ans = 0;

    for (int j = 0; j < M; j++) {
      int sum = 0;
      for (int i = 0; i < N; i++) {
        sum += A[i][j];
      }
      ans = Math.max(ans, sum);
    }

    return ans;
  }

  static int[] colWiseSum(int[][] A) {
    int N = A.length;
    int M = A[0].length;
    int[] result = new int[M];
    int resultIndex = 0;

    for (int j = 0; j < M; j++) {
      int sum = 0;
      for (int i = 0; i < N; i++) {
        sum += A[i][j];
      }
      result[resultIndex] = sum;
      resultIndex++;
    }

    return result;
  }

  static int[] rowWiseSum(int[][] A) {
    int N = A.length;
    int[] result = new int[N];
    int resultIndex = 0;

    for (int row = 0; row < N; row++) {
      int sum = 0;
      for (int col : A[row]) {
        sum += col;
      }

      result[resultIndex] = sum;
    }

    return result;
  }

  static int diagonalSum(int[][] A) {
    int N = A.length;
    int result = 0;
    int index = 0;

    while (index < N) {
      result += A[index][index];
      index++;
    }

    return result;
  }

  static int minorDiagonalElementSum(int[][] A) {
    int N = A.length;
    int jIndex = N - 1;
    int index = 0;
    int sum = 0;

    while (index < N) {
      sum += A[index][jIndex];
      index++;
      jIndex--;
    }

    return sum;
  }

  static int[][] antiDiagonalElement(int[][] A) {
    int N = A.length;
    int[][] result = new int[2 * N - 1][N];
    int resultIndex = 0;

    for (int col = 0; col < N; col++) {
      int x = 0;
      int y = col;
      int[] subArr = new int[N];
      int subArrIndex = 0;

      while (x < N && y >= 0) {
        subArr[subArrIndex] = A[x][y];
        subArrIndex++;
        x++;
        y--;
      }

      result[resultIndex] = subArr;
      resultIndex++;
    }

    for (int row = 1; row < N; row++) {
      int x = row;
      int y = N-1;
      int[] subArr = new int[N];
      int subArrIndex = 0;

      while (x < N && y >= 0) {
        subArr[subArrIndex] = A[x][y];
        subArrIndex++;
        x++;
        y--;
      }

      result[resultIndex] = subArr;
      resultIndex++;
    }

    return result;
  }

  static int[][] transposeMatrix(int[][] A) {
    int N = A.length;
    int M = A[0].length;
    int[][] result = new int[M][N];

    for (int row = 0; row < N; row++) {
      for (int col = 0; col < M; col++) {
        result[col][row] = A[row][col];
      }
    }

    return result;
  }

  static int[][] rotateMatrix(int[][] A) {
    int N = A.length;
    int[][] result = new int[N][N];

    for (int row = 0; row < N; row++) {
      for (int col = 0; col < N; col++) {
        result[row][col] = A[col][row];
      }
    }

    for (int[] row : result) {
      int index = 0;
      int jIndex = row.length - 1;

      while (index < jIndex) {
        int temp = row[index];
        row[index] = row[jIndex];
        row[jIndex] = temp;
        index++;
        jIndex--;
      }

    }

    return result;
  }
}
