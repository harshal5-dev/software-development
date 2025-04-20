package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L4_Introduction_to_Arrays.Assignment;

public class Assignment4 {

  static int[] solve(final int[] A) {
    int N = A.length;
    int[] ans = new int[N];

    for (int index = 0; index < N; index++) {
      ans[index] = A[N - index - 1];
    }

    return ans;
  }
}
