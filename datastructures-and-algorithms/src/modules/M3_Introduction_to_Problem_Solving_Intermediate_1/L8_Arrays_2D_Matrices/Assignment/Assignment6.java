package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L8_Arrays_2D_Matrices.Assignment;

public class Assignment6 {

  static int[][] solve(int[][] A) {
    int N = A.length;
    int M = A[0].length;
    int[][] ans = new int[M][N];

    for (int col = 0; col < M; col++) {
      for (int row = 0; row < N; row++) {
        ans[col][row] = A[row][col];
      }
    }

    return ans;
  }
}
