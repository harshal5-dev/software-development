package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L11_Interview_problems_on_Arrays.Assignment;

public class Assignment2 {

  int[] solve(int[] A, int[][] B) {
    int N = A.length;
    int M = B.length;
    int[] ans = new int[M];
    int[] prefixOdd = new int[N];

    for (int index = 1; index < N; index++) {
      prefixOdd[index] = prefixOdd[index - 1] + (index % 2 == 1 ? A[index] : 0);
    }

    for (int index = 0; index < M; index++) {
      int left = B[index][0];
      int right = B[index][1];
      int count = prefixOdd[right];

      if (left > 0) {
        count -= prefixOdd[left - 1];
      }

      ans[index] = count;
    }

    return ans;
  }
}
