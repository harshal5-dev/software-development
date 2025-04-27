package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L8_Arrays_2D_Matrices.Assignment;

public class Assignment4 {

  static int solve(final int[][] A) {
    int N = A.length;
    int index = 0;
    int jIndex = N - 1;
    int ans = 0;

    while (jIndex >= 0) {
      ans += A[index][jIndex];
      index++;
      jIndex--;
    }

    return ans;
  }
}
