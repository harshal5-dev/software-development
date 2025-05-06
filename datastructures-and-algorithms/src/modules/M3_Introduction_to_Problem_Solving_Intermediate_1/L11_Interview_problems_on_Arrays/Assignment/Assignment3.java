package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L11_Interview_problems_on_Arrays.Assignment;

public class Assignment3 {

  int solve(int[] A) {
    int N = A.length;
    int ans = 0;
    int[] prefixEven = new int[N];
    int[] prefixOdd = new int[N];

    prefixEven[0] = A[0];

    for (int index = 1; index < N; index++) {
      prefixEven[index] = prefixEven[index - 1] + (index % 2 == 0 ? A[index] : 0);
      prefixOdd[index] = prefixOdd[index - 1] + (index % 2 == 1 ? A[index] : 0);
    }

    for (int index = 0; index < N; index++) {
      int sumEven = prefixOdd[N-1] - prefixOdd[index];
      int sumOdd = prefixEven[N-1] - prefixEven[index];

      if (index > 0) {
        sumEven += prefixEven[index-1];
        sumOdd += prefixOdd[index-1];
      }

      if (sumEven == sumOdd) {
        ans++;
      }
    }

    return ans;
  }
}
