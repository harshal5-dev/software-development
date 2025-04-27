package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L8_Arrays_2D_Matrices.Assignment;

public class Assignment1 {

  static int[] solve(int[][] A) {
    int M = A[0].length;
    int[] ans = new int[M];

    for (int col = 0; col < M; col++) {
      int sum = 0;

      for (int[] ele : A) {
        sum += ele[col];
      }

      ans[col] = sum;
    }

    return ans;
  }
}
