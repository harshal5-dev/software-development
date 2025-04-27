package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L8_Arrays_2D_Matrices.Assignment;

public class Assignment5 {

  int[][] diagonal(int[][] A) {
    int N = A.length;
    int[][] ans = new int[2 * N -1][N];
    int ansIndex = 0;

    for (int col = 0; col < N; col++) {
      int x = 0;
      int y = col;
      int[] subArray = new int[N];
      int subIndex = 0;

      while (x < N && y >= 0) {
        subArray[subIndex] = A[x][y];
        x++;
        y--;
        subIndex++;
      }

      ans[ansIndex] = subArray;
      ansIndex++;
    }

    for (int row = 1; row < N; row++) {
      int x = row;
      int y = N -1;
      int[] subArray = new int[N];
      int subIndex = 0;

      while (x < N && y >= 0) {
        subArray[subIndex] = A[x][y];
        x++;
        y--;
        subIndex++;
      }

      ans[ansIndex] = subArray;
      ansIndex++;
    }

    return ans;
  }
}
