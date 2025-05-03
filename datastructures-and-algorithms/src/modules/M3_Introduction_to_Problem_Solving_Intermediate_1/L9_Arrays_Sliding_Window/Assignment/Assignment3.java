package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L9_Arrays_Sliding_Window.Assignment;

public class Assignment3 {

  static int printBoundary(int[][] A,int N, int i, int j, int val) {

    if (N == 1) {
      A[i][j] = val;
      return val;
    }

    for (int k = 1; k < N; k++) {
      A[i][j] = val;
      j++;
      val++;
    }

    for (int k = 1; k < N; k++) {
      A[i][j] = val;
      i++;
      val++;
    }

    for (int k = 1; k < N; k++) {
      A[i][j] = val;
      j--;
      val++;
    }

    for (int k = 1; k < N; k++) {
      A[i][j] = val;
      i--;
      val++;
    }

    return val;
  }

  static  int[][] generateMatrix(int A) {
    int[][] ans = new int[A][A];
    int index = 0;
    int jIndex = 0;
    int val = 1;

    while (A > 0) {
      val = printBoundary(ans, A, index, jIndex, val);
      index++;
      jIndex++;
      A -= 2;
    }

    return ans;
  }
}
