package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L9_Arrays_Sliding_Window.Assignment;

public class Assignment2 {

  int solve(int[] A, int B) {
    int N = A.length;
    int k = 0;

    for (int ele: A) {
      if (ele <= B) {
        k++;
      }
    }

    if (k == 0 || k == 1 || k == N) {
      return 0;
    }

    int bad= 0;
    for (int index = 0; index < k; index++) {
      if (A[index] > B) {
        bad++;
      }
    }

    int ans = bad;
    int s = 1, e = k;

    while (e < N) {
      if (A[s-1] > B) {
        bad--;
      }
      if (A[e] > B) {
        bad++;
      }
      ans = Math.min(ans, bad);
      s++;
      e++;
    }

    return ans;
  }
}
