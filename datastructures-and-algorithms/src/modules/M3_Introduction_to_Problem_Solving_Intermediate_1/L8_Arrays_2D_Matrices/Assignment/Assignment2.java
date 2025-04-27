package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L8_Arrays_2D_Matrices.Assignment;

public class Assignment2 {

  static int[] solve(int[][] A) {
    int N = A.length;
    int[] ans = new int[N];

    for (int row = 0; row < N; row++) {
      int sum = 0;

      for (int[] cols: A) {
        sum += cols[row];
      }

      ans[row] = sum;
    }

    return ans;
  }
}
