package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L6_Arrays_Carry_Forward.Assignment;

public class Assignment3 {

  static int solveBruteForce(int[] A) {
    int N = A.length;
    int minValue = Integer.MAX_VALUE;
    int maxValue = Integer.MIN_VALUE;

    for (int ele: A) {
      minValue = Math.min(minValue, ele);
      maxValue = Math.max(maxValue, ele);
    }

    if (minValue == maxValue) {
      return 1;
    }

    int ans = N;

    for (int index =0; index < N; index++) {

      if (A[index] == maxValue) {
        for (int jIndex = index;jIndex < N; jIndex++) {
          if (A[jIndex] == minValue) {
            ans = Math.min(ans, jIndex - index + 1);
            break;
          }
        }
      } else if (A[index] == minValue) {
        for (int jIndex = index; jIndex < N; jIndex++) {
          if (A[jIndex] == maxValue) {
            ans = Math.min(ans, jIndex - index + 1);
            break;
          }
        }
      }
    }

    return ans;
  }

  static int solve(int[] A) {
    int N = A.length;
    int minValue = Integer.MAX_VALUE;
    int maxValue = Integer.MIN_VALUE;

    for (int ele: A) {
      minValue = Math.min(minValue, ele);
      maxValue = Math.max(maxValue, ele);
    }

    if (minValue == maxValue) {
      return 1;
    }

    int ans = N;
    int minIndex = -1;
    int maxIndex = -1;

    for (int index = N-1; index >=0; index--) {

      if (A[index] == minValue) {
        minIndex = index;
        if (maxIndex != -1) {
          ans = Math.min(ans, maxIndex - minIndex + 1);
        }
      } else if (A[index] == maxValue) {
        maxIndex = index;
        if (minIndex != -1) {
          ans = Math.min(ans, minIndex - maxIndex + 1);
        }
      }

    }
    return ans;
  }

  public static void main(String[] args) {
    int[] arr1 = {1, 3, 2};
    int[] arr2 = {2, 6, 1, 6, 9};

    System.out.println(solveBruteForce(arr1));
    System.out.println(solveBruteForce(arr2));
    System.out.println("------------------");
    System.out.println(solve(arr1));
    System.out.println(solve(arr2));
  }

}
