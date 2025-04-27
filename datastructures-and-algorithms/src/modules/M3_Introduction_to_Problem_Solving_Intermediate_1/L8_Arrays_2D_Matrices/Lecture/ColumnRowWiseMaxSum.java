package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L8_Arrays_2D_Matrices.Lecture;

public class ColumnRowWiseMaxSum {

  static int[] rowWiseMaxSum(int[][] A) {
    int N = A.length;
    int[] ans = new int[N];

    for (int row = 0; row < N; row++) {
      int maxValue = Integer.MIN_VALUE;

      for (int[] cols: A) {
        maxValue = Math.max(maxValue, cols[row]);
      }

      ans[row] = maxValue;
    }

    return ans;
  }

  static int[] columnWiseMaxSum(int[][] A) {
    int M = A[0].length;
    int[] ans = new int[M];

    for (int col = 0; col < M; col++) {
      int maxValue = Integer.MIN_VALUE;

      for (int[] rows: A) {
        maxValue = Math.max(maxValue, rows[col]);
      }

      ans[col] = maxValue;
    }

    return ans;
  }
}
