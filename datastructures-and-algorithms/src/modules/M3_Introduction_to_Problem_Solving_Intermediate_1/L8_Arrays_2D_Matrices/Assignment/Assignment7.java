package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L8_Arrays_2D_Matrices.Assignment;

public class Assignment7 {

  static void reverse(int[] A) {
    int index = 0;
    int jIndex = A.length - 1;

    while (index < jIndex) {
      int temp = A[index];
      A[index] = A[jIndex];
      A[jIndex] = temp;
      index++;
      jIndex--;
    }
  }

  static void solve(int[][] A) {
    int N = A.length;

    for (int row = 0; row < N; row++) {
      for (int col = row + 1; col < N; col++) {
        int temp = A[row][col];
        A[row][col] = A[col][row];
        A[col][row] = temp;
      }
    }

    for (int[] rows : A) {
      reverse(rows);
    }
  }
}
