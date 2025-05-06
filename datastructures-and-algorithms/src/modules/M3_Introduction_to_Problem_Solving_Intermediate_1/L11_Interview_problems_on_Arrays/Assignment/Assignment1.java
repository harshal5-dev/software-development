package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L11_Interview_problems_on_Arrays.Assignment;

public class Assignment1 {

  int[] solve(int[] A, int[][] B) {
    int N = A.length;
    int M = B.length;
    int[] ans = new int[M];
    int[] prefixEven = new int[N];

    prefixEven[0] = A[0];

    for (int index = 1; index < N; index++) {
      prefixEven[index] = prefixEven[index -1] + (index % 2 == 0 ? A[index] : 0);
    }

    for (int index = 0; index < M; index++) {
      int left = B[index][0];
      int right = B[index][1];
      int count = prefixEven[right];

      if (left > 0) {
        count -= prefixEven[left - 1];
      }

      ans[index] = count;
    }

    return ans;
  }
}
